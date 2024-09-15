import Handsontable from "handsontable";

import { useEffect, useRef, useState } from "react";

export default function DatasetManagmentPanel() {
  const server_url = "http://localhost:8081";

  const csvDataRef = useRef();
  const csvFileRef = useRef();
  const btnEverythingRef = useRef();
  const btnIdRef = useRef();
  const btnStationNameRef = useRef();
  const btnParameterRef = useRef();
  const newTableRef = useRef();
  const formRef = useRef();
  const cautionRef = useRef();
  const closeSignRef = useRef();
  const tablesRef = useRef();
  const loadingGifRef = useRef();
  const saveCsvFileButtonRef = useRef();
  const selectorsRef = useRef();
  const idDivRef = useRef();
  const formFilledWithVariantsRef = useRef();

  const [hot, setHot] = useState();

  useEffect(() => {
    setHot(
      new Handsontable(csvDataRef.current, {
        data: [],
        colHeaders: true,
        columns: true,
        licenseKey: "non-commercial-and-evaluation",
      }),
    );

    window.addEventListener("scroll", () => {
      if (window.pageYOffset >= 20) {
        hide(closeSignRef.current);
      } else if (formRef.current.getAttribute("style") === "display: flex") {
        show(closeSignRef.current);
      }
    });

    fetch(`${server_url}/datasets/all`)
      .then((response) => response.json())
      .then((data) => {
        createInitialTable(data);
      })
      .catch((error) => {
        console.error(
          `Что-то пошло не так при получении данных датасета: ${error}`,
        );
      });

    async function createInitialTable(csvTable) {
      try {
        hot = new Handsontable(csvDataRef.current, {
          data: csvTable,
          colHeaders: await getColHeaders(),
          columns: await getColumns(),
          licenseKey: "non-commercial-and-evaluation",
        });
        hot.rootElement.style.display = "none";

        clickButtonAction(hot);
      } catch (error) {
        console.error(`Произошла ошибка в при создании таблицы: ${error}`);
      }
    }
  }, []);

  async function getColHeaders() {
    let list = "";
    const data = await getColumnNames();
    list = JSON.stringify(data);
    list = list.substring(1, list.length - 1);
    list = list.replaceAll('"', "");
    return list.split(",");
  }

  async function getColumnNames() {
    try {
      const url = `${server_url}/datasets/get/column-names`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Не удалось получить имена столбцов, потому что: " + error);
    }
  }

  async function getColumns() {
    let arr = await getColHeaders();
    return arr.map((element) => {
      return { data: element.toLowerCase() }; // lowercase is essential!
    });
  }

  async function getAllDataFromTable(hot) {
    let dataObject = [];
    let columns = await getColumns();
    for (let i = 0; i < hot.countRows() - 1; i++) {
      let row = hot.getDataAtRow(i);
      let obj = {};
      for (let j = 0; j < row.length; j++) {
        obj[columns[j].data] = row[j];
      }
      dataObject.push(obj);
    }
  }

  async function clickButtonAction() {
    let placeholderHotTable = new Handsontable(newTableRef.current, {
      data: [1, 1],
      colHeaders: await getColHeaders(),
      columns: await getColumns(),
      licenseKey: "non-commercial-and-evaluation",
    });

    if (this === btnEverythingRef.current) {
      showAllTable(placeholderHotTable);
      formRef.current.style.display = "none"; // !X
    } else if (this === btnIdRef) {
      placeholderHotTable.rootElement.style.display = "initial";
      formRef.current.style.display = "none"; // !X
      formRef.current.innerHTML = "";
      const btn = document.querySelector(".fn-btn");
      showById(hot, btn);
    } else if (this === btnStationNameRef.current) {
      placeholderHotTable.rootElement.style.display = "initial";
      formRef.current.style.display = "initial"; // !X
      let dataCol = showByStationName(hot);
      let children = formRef.current.children;
      for (let child of children) {
        child.addEventListener("click", async () => {
          let data = fillTableByChosenValue(child.innerHTML, dataCol);
          const newTable = createNewTable(data);
          newTable.updateSettings({
            colHeaders: await getColHeaders(),
          });
        });
      }
    } else if (this === btnParameterRef.current) {
      placeholderHotTable.rootElement.style.display = "initial";
      formRef.current.style.display = "initial"; // !X
      let dataCol = showByParameter(hot);
      let children = formRef.current.children;
      for (const child of children) {
        child.addEventListener("click", async () => {
          let data = fillTableByChosenParameter(child.innerHTML, dataCol);
          const newTable = createNewTable(data);
          newTable.updateSettings({
            colHeaders: await getColHeaders(),
          });
        });
      }
    }
  }

  function showAllTable() {
    placeholder_hot_table.rootElement.style.display = "none";
    hot.rootElement.style.display = "initial";
  }

  function createNewTable(data) {
    // clear table
    hot.rootElement.style.display = "none";
    newTableRef.current.innerHTML = "";
    return new Handsontable(newTableRef.current, {
      data: data,
      colHeaders: getColHeaders(),
      columns: getColumns(),
      licenseKey: "non-commercial-and-evaluation",
    });
  }

  function showById(hot, btn) {
    btn.addEventListener("click", () => {
      let form_input = document.querySelector(".id-form-text-input");
      let value = form_input.value; // !X
      let isThereValue = false;
      event.preventDefault();
      if (isNaN(value)) {
        form_input.value = "";
        form_input.setAttribute("placeholder", "Вы должны ввести число");
      } else {
        const IDs = hot.getDataAtCol(0);
        let iterator = 0;
        while (iterator < IDs.length) {
          if (IDs[iterator] === value) {
            cautionRef.current.innerHTML = "";

            const dataAtRow = hot.getDataAtRow(iterator);
            // insert data from object into array
            let arrayDataAtRow = [];
            for (let objectElement in dataAtRow) {
              arrayDataAtRow.push(dataAtRow[objectElement]);
            }
            let twoDimArray = [arrayDataAtRow];
            createNewTable(twoDimArray);

            form_input.value = "";
            form_input.setAttribute("placeholder", "Данные найдены");

            isThereValue = true;
            break;
          }
          if (isThereValue) break;
          iterator++;
        }

        if (hot.getDataAtCell(iterator, 0) === null) {
          form_input.value = "";
          form_input.setAttribute("placeholder", "Совпадений не найдено");
        }
      }
    });
  }

  function showByStationName(hot) {
    formRef.current.innerHTML = "";
    let dataCol = 0;
    for (let i = 0; i < hot.countCols(); i++) {
      let column = hot.getColHeader(i);
      if (column === "station_name") dataCol = i;
    }
    const station_names = hot.getDataAtCol(dataCol);
    const no_dups_station_names = [...new Set(station_names)];
    for (let i = 0; i < no_dups_station_names.length; i++) {
      formRef.current.innerHTML += `<li>${no_dups_station_names[i]}</li>`;
    }
    return dataCol;
  }

  function fillTableByChosenValue(value_name, dataCol) {
    let data = [];
    const station_names = hot.getDataAtCol(dataCol);
    for (let i = 0; i < hot.countRows(); i++) {
      if (station_names[i] == value_name) {
        let dataObject = hot.getDataAtRow(i);
        let dataArray = [];
        for (let data in dataObject) {
          dataArray.push(dataObject[data]);
        }
        data.push(dataArray);
      }
    }
    return data;
  }

  function showByParameter(hot) {
    formRef.current.innerHTML = "";
    let dataCol = 0;
    for (let i = 0; i < hot.countCols(); i++) {
      let column = hot.getColHeader(i);
      if (column === "parameter") dataCol = i;
    }
    const parameters = hot.getDataAtCol(dataCol);
    const no_dups_parameters = [...new Set(parameters)];
    for (let i = 0; i < no_dups_parameters.length; i++) {
      formRef.current.innerHTML += `<li>${no_dups_parameters[i]}</li>`;
    }
    return dataCol;
  }

  function fillTableByChosenParameter(parameterName, dataCol) {
    const parameter_names = hot.getDataAtCol(dataCol);
    let data = [];
    for (let i = 0; i < hot.countRows(); i++) {
      if (parameter_names[i] === parameterName) {
        let dataObject = hot.getDataAtRow(i);
        let dataArray = [];
        for (let data in dataObject) {
          dataArray.push(dataObject[data]);
        }
        data.push(dataArray);
      }
    }
    return data;
  }

  function saveCsvFile(event) {
    event.preventDefault();
    loadingGifRef.current.style.display = "initial";
    try {
      const file = csvFileRef.current.files[0]; // actual file user has chosen to upload
      const url = `${server_url}/datasets/uploadCSV`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
        },
        body: file,
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    } catch (error) {
      console.log("Произошла ошибка: " + error);
    }
  }

  async function wipeWholeTable() {
    const url = `${server_url}/datasets/wipe-all-data`;
    const res = await fetch(url, {
      method: "DELETE",
    });
    if (res.status === 200) {
      location.reload();
    } else {
      errorOnWipe.textContent =
        "Не удалось очистить сохранённый датасет в базе данных. Статус ошибки: " +
        res.status;
    }
  }

  let count_times_clicked = 0; // needed to disable bug when on first click doesn't appear

  function hide(value) {
    value.style.display = "none";
  }

  function show(value) {
    value.style.display = "flex";
  }

  function alignTableLeft() {
    tables.style.justifyContent = "left";
  }

  useEffect(() => {
    const fnBtn = document.querySelector(".fn-btn");
    const idForm = document.querySelector(".idForm");

    fnBtn.addEventListener("click", () => {
      hide(selectorsRef.current);
    });

    btnEverythingRef.current.addEventListener("click", () => {
      hide(closeSignRef);
      hide(formFilledWithVariantsRef.current);
      hide(idForm);
      hide(selectorsRef.current);
      alignTableLeft();
    });

    btnIdRef.current.addEventListener("click", () => {
      hide(closeSignRef);
      hide(selectorsRef.current);
      show(idForm);
      alignTableLeft();
    });

    btnStationNameRef.current.addEventListener("click", () => {
      hide(idForm);
      show(closeSignRef);
      show(formFilledWithVariantsRef.current);
      alignTableLeft();
    });

    btnParameterRef.current.addEventListener("click", () => {
      hide(idForm);
      show(closeSignRef);
      show(formFilledWithVariantsRef.current);
      alignTableLeft();
    });

    closeSignRef.current.addEventListener("click", () => {
      setTimeout(() => {
        hide(closeSignRef);
        hide(formFilledWithVariantsRef.current);
        formFilledWithVariantsRef.current.innerHTML = "";
      }, 200);
    });
  }, []);

  return (
    <div className="whole-block-holder">
      <div className="buttons-panel">
        <div className="file-upload-div">
          <form
            method="POST"
            ref={formRef}
            encType="multipart/form-data"
            className="uploadCSV"
            onClick={() => {
              setTimeout(() => {
                formRef.current.style.display = "none";
                closeSignRef.current.style.display = "none";
                formRef.current.innerHTML = "";
              }, 400);
            }}
          >
            <input
              className="csv-file"
              type="file"
              name="file"
              ref={csvFileRef}
            />
            <input
              className="submitUploadBtn"
              ref={saveCsvFileButtonRef}
              type="submit"
              value="Загрузить"
              onClick={saveCsvFile}
            />
          </form>
          <img
            src="images/loading.gif"
            alt="loading..."
            ref={loadingGifRef}
            className="loading-gif"
          />
        </div>

        <div className="buttons">
          <div className="form-chose-what-to-select">
            <button
              className="show-action-button"
              onClick={() => {
                count_times_clicked++;
                if (count_times_clicked == 1) {
                  hide(selectorsRef);
                }
                if (selectorsRef.style.display === "none") {
                  show(selectorsRef);
                } else {
                  hide(selectorsRef);
                }
                hide(idFormRef);
              }}
            >
              Показать данные
            </button>
            <div className="selectors" ref={selectorsRef}>
              <button
                className="btn_everything"
                ref={btnEverythingRef}
                onClick={clickButtonAction}
              >
                Всё
              </button>
              <button
                className="btn_ID"
                ref={btnIdRef}
                onClick={clickButtonAction}
              >
                По ID
              </button>
              <button
                className="btn_station_name"
                ref={btnStationNameRef}
                onClick={clickButtonAction}
              >
                По названию станции
              </button>
              <button
                className="btn_parameter"
                ref={btnParameterRef}
                onClick={clickButtonAction}
              >
                По параметру
              </button>
            </div>
            <div className="choose-list-div" ref={idDivRef}>
              <ul
                className="form-filled-with-variants"
                ref={formFilledWithVariantsRef}
              ></ul>
              <p
                className="close-sign"
                ref={closeSignRef}
                onClick={() => {
                  setTimeout(() => {
                    formRef.current.style.display = "none";
                  }, 200);
                }}
              >
                X
              </p>
              {true && (
                <div class="idForm">
                  <input
                    class="id-form-text-input"
                    type="text"
                    placeholder="Введите ID"
                  />
                  <button class="fn-btn">Найти</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="wipe-table-div">
          <button className="wipe-data" onClick={wipeWholeTable}>
            Удалить всю таблицу
          </button>
        </div>

        <div className="map-text-div">
          <a href="../index.html">
            <button className="back-to-map">Вернуться к карте</button>
          </a>
        </div>
      </div>

      <div className="tables" ref={tablesRef}>
        <div className="csvdata" ref={csvDataRef}></div>
        <div className="display_table" ref={newTableRef}></div>
      </div>
      <p id="caution-on-failed-wipe" ref={cautionRef}></p>
    </div>
  );
}
