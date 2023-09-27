import './social.css';

export class SocialControl {
    onAdd(map) {
        this.map = map;
        this.controlContainer = document.createElement('div');
        this.controlContainer.classList.add('maplibregl-ctrl');
        this.controlContainer.classList.add('maplibregl-ctrl-group');
        this.mapStyleContainer = document.createElement('div');
        this.styleButton = document.createElement('button');
        this.styleButton.type = 'button';
        this.mapStyleContainer.classList.add('maplibregl-style-list');
        this.styleButton.classList.add('maplibregl-ctrl-icon');
        this.styleButton.classList.add('maplibre-ctrl-socials');
        this.styleButton.addEventListener('click', () => {
            alert('hi');
        });
        document.addEventListener('click', this.onDocumentClick);
        this.controlContainer.appendChild(this.styleButton);
        this.controlContainer.appendChild(this.mapStyleContainer);
        return this.controlContainer;
    }

    onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
    }
}

export default { SocialControl }