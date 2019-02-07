import Demonstrator from './demonstrator';
import './style/index.scss';

document.addEventListener('DOMContentLoaded', () => {
    const demonstrator = new Demonstrator({
        by: '.js-target',
        document: document
    });

    demonstrator.init();
});
