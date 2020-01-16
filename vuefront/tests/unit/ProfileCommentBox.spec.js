import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ProfileCommentBox from '@/components/ProfileCommentBox.vue'

describe('ProfileCommentBox.vue', () => {
  it('renders passedUsername in in the comment box', () => {
    const passedUsername = 'Jorma'
    const passedId= 1
    const wrapper = shallowMount(ProfileCommentBox, {
      propsData: { passedUsername, passedId }
    })
    expect(wrapper.find('h3').text()).equals('Jorma')
    // wrapper.find('.text-input > h3').text().includes
  })
})
