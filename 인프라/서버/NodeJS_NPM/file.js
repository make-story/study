
// 경로
const source = path.resolve(__dirname, '../');
const read = fs.readdirSync(source, { withFileTypes: true });
const { directory, file } = read.reduce((accumulator, item, index) => {
    if(item.isDirectory()) {
        // 폴더 리스트
        accumulator.directory.push(item.name);
    }else {
        // 파일 리스트
        accumulator.file.push(item.name);
    }
    return accumulator;
}, { directory: [], file: [] });
// 폴더 리스트
//const directory = read.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
// 파일 리스트
//const file = read.filter(dirent => !dirent.isDirectory()).map(dirent => dirent.name);