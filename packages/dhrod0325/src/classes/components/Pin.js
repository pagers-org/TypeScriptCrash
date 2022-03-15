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

export function createRandomPin(pinId) {
    const key = Math.floor(Math.random() * 123) + 1;

    return {
        _id: pinId,
        image: 'https://randomfox.ca/images/' + key + '.jpg',
        key
    }
}