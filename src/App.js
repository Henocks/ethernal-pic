import React, {Component} from 'react';

import EthernalPic from './blockchain/ethernalPic';
import Navigator from './components/navigator/Navigator';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import ImageConvertor from './components/imgconvertor/imgconvertor';

import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Navigator/>

                <ImageConvertor/>
                <EthernalPic/>
                
                <Content/>
                <Footer/>
            </div>
        );
    }
}

export default App;
