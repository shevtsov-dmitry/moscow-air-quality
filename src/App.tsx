// import "./index.css";

export function App() {
  return (
    <main>
      <div className="text-is-not-uploaded">
        <h1>Данные не загружены</h1>
      </div>

      <div className="authorization-icon">
        {/* TODO move with react  */}
        {/* <a href="html/authorization.html"> */}
        <img src="static/authorization_icon.png" alt="log in" />
        {/* </a> */}
      </div>

      <div className="choose-date-icon-div">
        <img src="./assets/images/calendar.png" className="btn-img-to-show-date-choose" alt="" srcset="" />
      </div>
      <div className="list-of-dates-div">
        <ul className="choose-year" />
        <ul className="choose-month" />
      </div>

      <div className="select-container">
        <h1 className="select-close-sign">X</h1>
        <ul className="select-ul" />
        <div className="emote-and-color-block">
          <div className="color-block">
            <div className="image-block" />
          </div>
        </div>
      </div>
      <div id="map" />
    </main>
  );
}

export default App;
