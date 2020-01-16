import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ProfilePage from '@/components/ProfilePage.vue'

describe('ProfilePage.vue', () => {
  it('places username in the h3 below profile picture', () => {
      const wrapper = shallowMount(ProfilePage, {
          propsData: {
              passedUsername: 'Jorma',
          }
      })
    const result = wrapper.find('#username-header').text()
    //const result = wrapper.contains(selector)
    expect(result).to.equal('Jorma')
  })

  it('should contain profile picture', () => {
      const wrapper = shallowMount(ProfilePage, {
          propsData: {
              passedUsername: 'Jorma',
          }
      })
    wrapper.vm.getUserInfo()
    expect(wrapper.vm.$data.profilePicture).to.equal('Portrait_placeholder')
  })
})
