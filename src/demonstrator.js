class Demonstrator {
    constructor(params) {
        this._by = params.by;
        this._currentStep = 0;
        this._$currenElement = null;
        this._$selectedWrapper = null;
        this._$overlay = null;
        this._zIndex = params.zIndex || 10000;
        this._$document = params.wrapper || document;
    }

    init() {
        this._elements = [...this._$document.querySelectorAll(this._by)];

        this.start();
    }

    start() {
        this._createOverlay();
        this._createSelectedWrapper();

        this._currentStep = 1;
        this._selectElement();
    }

    _selectElement() {
        if (this._$currenElement) {
            this._$currenElement.classList.remove('demonstrator__item_selected');
            this._$currenElement.style.zIndex = 'unset';
        }


        this._$currenElement = this._elements.find(element => element.dataset.position === `${this._currentStep}`);

        this._selectCurrentElement();
    }

    _createOverlay() {
        this._$overlay = this._$document.createElement('div');
        this._$overlay.className = 'js-overlay demonstrator__overlay';
        this._$overlay.style.zIndex = this._zIndex;

        this._$document.body.appendChild(this._$overlay);
    }

    _createSelectedWrapper() {
        this._$selectedWrapper = this._$document.createElement('div');
        this._$selectedWrapper.className = 'demonstrator__item-wrapper';
        this._$selectedWrapper.style.zIndex = this._zIndex;
        this._$selectedWrapper.style.display = 'none';

        this._$selectedWrapper.innerHTML = `
    	<div class="demonstrator__item-wrapper-buttons">
      	<div class="demonstrator__item-wrapper-buttons-prev">Назад</div>
        <div class="demonstrator__item-wrapper-buttons-next">Вперед</div>
      </div>
    `;

        this._$document.body.appendChild(this._$selectedWrapper);
        this._$document.querySelector('.demonstrator__item-wrapper-buttons-prev').addEventListener('click', this._onClickPrevButton.bind(this));
        this._$document.querySelector('.demonstrator__item-wrapper-buttons-next').addEventListener('click', this._onClickNextButton.bind(this));
    }

    _onClickPrevButton(event) {
        this._currentStep--;

        if (this._currentStep <= 0) {
            this._currentStep = this._elements.length;
        }

        this._selectElement();
    }

    _onClickNextButton(event) {
        this._currentStep++;

        if (this._currentStep > this._elements.length) {
            this._currentStep = 1;
        }

        this._selectElement();
    }

    _selectCurrentElement() {
        this._$currenElement.style.zIndex = this._zIndex + 1;
        this._$currenElement.classList.add('demonstrator__item_selected');

        this._showWrapper();
    }

    _showWrapper() {
        const {width, height, left, top} = this._$currenElement.getBoundingClientRect();


        this._$selectedWrapper.style.display = 'block';
        this._$selectedWrapper.style.width = `${width}px`;
        this._$selectedWrapper.style.height = `${height}px`;
        this._$selectedWrapper.style.left = `${left}px`;
        this._$selectedWrapper.style.top = `${top}px`;
    }

    get bodyStyles() {
        return {
            overflow: 'hidden'
        };
    }
}

export default Demonstrator;
