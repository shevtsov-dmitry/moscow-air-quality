import "./index.css";

export function App() {
  return (
    <main>
      <div class="text-is-not-uploaded">
        <h1>Данные не загружены</h1>
      </div>

      <div class="authorization-icon">
        <a href="html/authorization.html"><img src="static/authorization_icon.png" alt="log in" /></a>
      </div>

      <div class="choose-date-icon-div">
        <img src="static/calendar.png" class="btn-img-to-show-date-choose" alt="" srcset="" />
      </div>
      <div class="list-of-dates-div">
        <ul class="choose-year" />
        <ul class="choose-month" />
      </div>

      <div class="select-container">
        <h1 class="select-close-sign">X</h1>
        <ul class="select-ul" />
        <div class="emote-and-color-block">
          <div class="color-block">
            <div class="image-block" />
          </div>
        </div>
      </div>
      <div id="map" />
    </main>
  );
}

export default App;
