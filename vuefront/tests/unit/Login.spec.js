import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Login from '@/components/login.vue'
//import { mount } from '@vue/test-utils'

describe('login.vue', () => {
  it('button has correct text rendered', () => {
    const wrapper = shallowMount(Login, {
      authenticated: 'username'
    });
    const button = wrapper.find('#LoginButton')
    const usernames = wrapper.find('username')
    const authenticate = wrapper.find('authenticated')
    button.trigger('click')
   
    expect(authenticate).equal({authenticated: usernames})
    //expect(message).toBe('Login')
    //expect(wrapper.find('button').text()).equal('Login');
    });
})