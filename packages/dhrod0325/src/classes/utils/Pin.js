export function pinTemplate(pin) {
  return `
            <div class="pin">
                <div class="button-wrapper">
                    <div class="anim-icon anim-icon-md heart">
                        <input type="checkbox" id="heart${pin._id}" class="togglePin">
                        <label for="heart${pin._id}"></label>
                    </div>
                </div>
                <img src="${pin.image}" alt=""/>
            </div>
        `;
}

export function createRandomKey() {
  return Math.floor(Math.random() * 123) + 1;
}

export function createRandomFoxImageUrl(key) {
  return `https://randomfox.ca/images/${key}.jpg`;
}

export function createRandomPin(pinId) {
  const key = createRandomKey();

  return {
    _id: pinId,
    image: createRandomFoxImageUrl(key),
    key,
  };
}
