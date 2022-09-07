// import React from 'react';
// import { shallow } from 'enzyme';
// import Footer from "./footer.component";
// import {IntlProvider} from "react-intl";
// import mount from "enzyme/src/mount";
//
// it("should render year", ()=>{
//   const Provider = require('react-redux').Provider;
//   const createStore = require('redux').createStore;
//   const reducers = require('../../redux/root-reducer').default;
//   const store = createStore(reducers);
//
//   const wrapper = mount(<Provider store={store}>
//     <IntlProvider locale='en'>
//       <Footer />
//     </IntlProvider>
//   </Provider>);
//   const span = wrapper.find("span");
//   const result = span.text;
//
//   console.log('=> ', wrapper.debug());
//   expect(result).toBe("wqw");
// })