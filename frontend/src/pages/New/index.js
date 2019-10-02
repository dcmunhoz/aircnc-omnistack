import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.svg'

import './styles.css'

export default function New({history}){

    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {

        return thumbnail ? URL.createObjectURL(thumbnail) : null

    },[ thumbnail ]) ;

    async function handleSubmit(e) {
        e.preventDefault();    

        const data = new FormData();
        const user_id = localStorage.getItem('user');
        
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard')

    }

    return (
        <form onSubmit={handleSubmit}>

            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}    
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select image" title="Select image" />
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input 
                type="text"
                id="company"
                name="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={e => setCompany(e.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por virgula ' , ')</span></label>
            <input 
                type="text"
                id="techs"
                name="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={e => setTechs(e.target.value)}
            />
    
            <label htmlFor="price">VALOR DA DIARIA * <span>(em branco para gratuito)</span></label>
            <input 
                type="text"
                id="price"
                name="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )   
}