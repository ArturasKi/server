const utils = {};

utils.fileExtension = (url) => {
    const mainParts = url.split('?')[0];
    const dotParts = mainParts.split('.');
    return dotParts[dotParts.length - 1];
}

export { utils };

// 1)
// export { utils };
// import { utils } from './utils.js';
// import { utils as kitasPavadinimas } from './utils.js'; pervadinimas


// // 2)
// export default utils;
// import kitasPavadinimas from './utils.js'; importuojant galima pervadinti