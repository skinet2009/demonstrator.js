import Demonstrator from './demonstrator';

document.addEventListener('DOMContentLoaded', () => {
    const demonstrator = new Demonstrator({
        by: '.js-target',
        document: this.document
    });

    demonstrator.init();
});
