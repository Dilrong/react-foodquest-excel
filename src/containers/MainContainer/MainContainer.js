import React, {Component} from 'react';
import { Container, Loader, Image, Menu, Input, Button } from 'semantic-ui-react';
import { BestCard } from '../../components';
import logo from '../../images/logo.svg';
import './MainContainer.css';

export default class MainContainer extends Component{
    state={
        data: [],
        isLoading: false,
        keyword: ''
    }

    componentDidMount(){
        this._getSheetData()
    }

    _getSheetData = async() => {
        const data = await this._callSheetData()
        this.setState({
            data: data.rows,
            isLoading: true
        })
        console.log(this.state.data)
    }

    _callSheetData = async() => {
        return fetch('http://foodquest.co.kr:3001/api?id=1mFPxl0jTEgqqG6Gf4KYLP2O_87eLIpRGuTBvE2NoJ24&columns=false')
        .then(request => request.json())
        .catch(err => console.log(err))
    }

    handleChange = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    render(){
        const { data, keyword, isLoading } = this.state;

        const mapToCards = (data) => {
            data = data.filter(
                (card) => {
                    return card.name.indexOf(keyword) !== -1;
                }
            );
            return data.map(
                (card, index) => {
                    return (<BestCard key={index} data={card}/>);
                }
            );
        }

        return(
            <Container>
                <Container>
                    <Menu stackable>
                    <Menu.Item>
                        <Image className="logo" size='small' src={logo}/>
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Input 
                        icon='search' 
                        placeholder='내 친구의 맛집은?'
                        onChange={this.handleChange}
                        value={keyword}
                        />
                    </Menu.Item>
                </Menu>
            </Container>
                {isLoading ? (mapToCards(data.reverse())) : (<Loader className='loader' active size='big' inline='centered'>Loading</Loader>)}
                <a href='https://goo.gl/forms/oXjtmkt4AbZe2At52'><Button className='write' circular icon='pencil' color='yellow'/></a>
            </Container>
        )
    }
}