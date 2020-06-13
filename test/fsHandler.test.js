const fs = require('fs')
const expect = require('chai').expect
const os = require('os')
const path = require('path')
const {
  readFile,
  readDir
} = require('../src/fsHandler')

describe('[fsHandler]', () => {

  describe('readFile', () => {

    const testPath = path.resolve(os.tmpdir(), 'text_file.txt')

    afterEach((done) => {
      fs.unlink(testPath, () => {
        done()
      })
    })

    it('reads a file', (done) => {
      fs.writeFile(testPath, 'contents', async () => {
        const result = await readFile(testPath, 'utf-8')
        expect(result).to.equal('contents')
        done()
      })
    })

    it('throws an error if file can not be found', (done) => {
      fs.writeFile(testPath, 'contents', async () => {
        try {
          await readFile('other_path', 'utf-8') 
        } catch (err) {
          expect(err.message).to.equal('ENOENT: no such file or directory, open \'other_path\'')
          done()
        }
      })
    })

  })

  describe('readDir', () => {

    const testDir = path.resolve(os.tmpdir(), 'test')
    const testFile = path.resolve(testDir, 'test_file.txt')

    afterEach((done) => {
      // remove file so dir is empty; then remove directory.
      fs.unlink(testFile, () => {
        fs.rmdir(testDir, () => {
          done()
        })
      })
    })

    it('reads a directory', (done) => {
      fs.mkdir(testDir, () => {
        fs.writeFile(testFile, 'contents', async () => {
          const result = await readDir(testDir)
          expect(result).to.deep.equal([
            'test_file.txt'
          ])
          done()
        })
      })
    })

    it('throws an error if the directory can not be found', (done) => {
      readDir('non_existent').catch(err => {
        expect(err.message).to.equal('ENOENT: no such file or directory, scandir \'non_existent\'')
        done()
      })
    })

  })

})