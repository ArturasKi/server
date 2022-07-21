const utils = {};

utils.fileExtension = (url) => {
    // www.psl.lt/js/main.js
    // www.psl.lt/js/main.min.js
    // www.psl.lt/js/main.5rg5e1f65res.js
    // www.psl.lt/js/main.js ? v = 1.33.7
    // www.psl.lt/js/main.min.js ? v = 1.33.7

    const mainPart = url.split('?')[0];
    const dotParts = mainPart.split('.');
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