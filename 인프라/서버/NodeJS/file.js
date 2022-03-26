
// 경로
const source = path.resolve(__dirname, '../');
const read = fs.readdirSync(source, { withFileTypes: true });
// 폴더 리스트
const directory = read.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
// 파일 리스트
const file = read.filter(dirent => !dirent.isDirectory()).map(dirent => dirent.name);