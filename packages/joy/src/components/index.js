//Explore - 북마크 설정
export function heartBtnWrapper(globalIndex, random) {
  const buttonWrapper = document.createElement('div');
  buttonWrapper.setAttribute('class', 'button-wrapper');
  buttonWrapper.innerHTML = `
    <div class="anim-icon anim-icon-md heart">
        <input type="checkbox" id="heart${globalIndex}" />
        <label for="heart${globalIndex}" key=${random}></label>
    </div>
  `;
  return buttonWrapper;
}

//Explore
export function explore_tab() {
  return `
    <div class="container"></div>
    <div class="loader"></div>
  `;
}

//Saved
export function saved_tab(result) {
  return `
    <div class="container">
    ${result
      .map(
        ({ _id, url }, index) => `
      <div class="pin">
        <div class="button-wrapper">
          <div class="anim-icon anim-icon-md heart">
            <input type="checkbox" id="heart${index}" checked>
            <label for="heart${index}" key=${_id}></label>
          </div>
        </div><img src="https://randomfox.ca/images/${url}.jpg">
      </div>`
      )
      .join('')}
    </div>
    `;
}