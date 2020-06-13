const expect = require('chai').expect
const {
  deepFlatten
} = require('../src/utils')

describe('[utils]', () => {

  describe('deepFlatten', () => {
    
    it('flattens a target property at 1 level', () => {
      const target = [
        {
          'level_1': '1'
        }, {
          'level_1': '2'
        }, {
          'level_1': '3'
        }
      ]
      const result = deepFlatten(target, 'level_1')
      expect(result).to.deep.equal(['1', '2', '3'])
    })

    it('flattens a target property at 2 levels', () => {
      const level_1 = [
        {
          'level_2': '2'
        }, {
          'level_2': '2'
        }, {
          'level_2': '2'
        }
      ]
      const target = [
        {
          'level_1': level_1
        }, {
          'level_1': level_1
        }, {
          'level_1': level_1
        }
      ]
      const result = deepFlatten(target, 'level_1.level_2')
      // 3^2 = 9
      expect(result).to.deep.equal([
        '2', '2', '2', '2', '2', '2', '2', '2', '2'
      ])
    })

    it('flattens a target property at 3 levels', () => {
      const level_2 = [
        {
          'level_3': '3'
        }, {
          'level_3': '3'
        }, {
          'level_3': '3'
        }
      ]
      const level_1 = [
        {
          'level_2': level_2
        }, {
          'level_2': level_2
        }, {
          'level_2': level_2
        }
      ]
      const target = [
        {
          'level_1': level_1
        }, {
          'level_1': level_1
        }, {
          'level_1': level_1
        }
      ]
      const result = deepFlatten(target, 'level_1.level_2.level_3')
      // 3^3 = 27
      expect(result).to.deep.equal([
        '3', '3', '3', '3', '3', '3',
        '3', '3', '3', '3', '3', '3',
        '3', '3', '3', '3', '3', '3',
        '3', '3', '3', '3', '3', '3',
        '3', '3', '3'
      ])
    })

  })

})