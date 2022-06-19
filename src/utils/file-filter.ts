export const filter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg|bmp|doc|docs|pdf|txt|cdr|djvu|psd|csv)$/)) {
        return callback(new Error('Неверный тип изображения. Допустимые типы: "jpg/jpeg/png/svg/bmp/doc/docs/pdf/txt/cdr/djvu/psd/csv"'), false);
    }
    callback(null, true);
};