import React, {Component} from 'react'
import Main from '../main'
import Axios from 'axios'


const headerProp = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir.'
}

const baseUrl = 'http://localhost:3001/users'
const initialStage = {
    user: {name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {
    state = {...initialStage}
    ComponentASerExibido(){
        Axios(baseUrl).then(resp =>{
            this.setState({list: resp.data})
        })
    }
clear(){
    this.setState({user: initialStage.user})
}
save(){
    const user = this.state.user
    const methdo = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    Axios[methdo](url, user)
    .then(resp => {
        const list = this.getUpdatedList(resp.data)
        this.setState({user: initialStage.user, list})
    })

}
atualizarCampo (event){
    const user = {...this.state.user}
    user[event.target.name]= event.target.value
    this.setState({user})
    console.log(user);
}
renderForm(){
    return (
        <div className="form">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label htmlfor="name">Nome</label>
                            <input type="text" id="name"
                            name="name"
                            value={this.state.user.name}
                            placeholder="Digite o seu nome"
                            onChange={e => this.atualizarCampo(e)} className="form-control"/>
                    </div>
                </div>
                <div className="col-12 col-md-16">
                    <div className="form-group">
                        <label htmlFor="E-mail">E-mail</label>
                            <input id="E-mail" type="text" className="form-control"
                            name="email" placeholder="Digite seu email" value={this.state.user.email} 
                           onChange={e => this.atualizarCampo(e)} />
                    </div>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button onClick={e =>this.save(e)} className="btn btn-primary">
                        Salvar
                    </button>
                    <button onClick={e=>this.clear(e)} className="btn btn-secondary ml-2">
                        Cancelar

                    </button>
                </div>
            </div>
        </div>
    )
}
getUpdatedList(user){
    const list =  this.state.list.filter(u => u.id !== user.id)
    list.unshift(user)
    return list
}

load(user){
    this.setState({user})

}
renderTable(){
    return(
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {this.renderLinhas()}

            </tbody>
        </table>
    )
}
renderLinhas(){
    return this.state.list.map(user =>{
        
        return(
            <tr key={user.id}>
                <td >{user.name}</td>
                <td >{user.email}</td>
                <td>
                    <button onClick={()=>this.load(user)} className="btn btn-warning">
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button onClick={()=>this.remove(user)} className="btn btn-danger">
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })
}
remove(user){
    Axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
        const list = this.state.list.filter(u => u !== user)
        this.setState({list})
    })
}
    render() {
        return (
            <Main {...headerProp}>
               {this.renderForm()}
               {this.renderTable()}
            </Main>
        )
    }
}

     