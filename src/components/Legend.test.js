import React from 'react'
import {shallow} from 'enzyme'
import Legend from './Legend'

export const mockDomains = [
  {
    'startCodon': 57,
    'endCodon': 167,
    'label': 'Recep_L_domain',
    'color': '#2dcf00',
    'tooltip': {
      'header': 'Recep_L_domain',
      'body': 'Recep_L_domain (57 - 167)'
    }
  },
  {
    'startCodon': 185,
    'endCodon': 338,
    'label': 'Furin-like',
    'color': '#ff5353',
    'tooltip': {
      'header': 'Furin-like'
    }
  }
]

describe('Legend', () => {
  it('should not render anything if theres is no domains', () => {
    const wrapper = shallow(<Legend domains={[]} />)
    expect(wrapper).toEqual({})
  })
  it('should render legend', () => {
    const wrapper = shallow(<Legend domains={mockDomains} />)
    expect(wrapper.find('g').length).toBe(1)
    expect(wrapper.find('rect').length).toBe(2)
  })
})
