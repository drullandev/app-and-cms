import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { IonSpinner } from '@ionic/react';
//import Header from './Header'
import Page from '../Page';
import About from '../../pages/Main/About';
//const  testing = false
const MyComponent = ({ name, slug, params, content, override }) => {
    //if(testing) console.log('setMyComponent', { name, slug, params, content, override })
    const returnComponent = (slug, jsx = true) => {
        switch (slug) {
            //case 'header': 
            //console.log({ name, slug, params, content })        
            //return <Header label={params.label} slot={params.slot}/>
            //case 'home': return jsx ? <Home /> : Home
            //case 'speakers': return <SpeakerList />
            //case 'MateDetail': return jsx ? <MateDetail /> : MateDetail
            //case 'map': return jsx ? <MapView /> : MapView
            case 'about': return _jsx(About, {});
            //case 'tutorial': return <Tutorial/>
            //case 'account': return <Account/>
            //case 'main': return <Main/>
            //case 'content': return <Content row={content}/>
            case 'page': return Page;
            default: return _jsx(IonSpinner, { name: 'dots' });
        }
    };
    return _jsx(_Fragment, { children: returnComponent(slug) });
};
export default MyComponent;
