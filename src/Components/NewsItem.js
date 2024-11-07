import React, { Component } from 'react'




export default class NewsItem extends Component {

    static defaultProps = {
        title: "Title is not available",
        description: "Description is not available"
    }
    render() {
        let { title, description,imageurl ,newsurl} = this.props;
        return (
            <div className='my-3 '>
                <div className="card" style={{ width: '27rem', height:'30rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <img src={imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={newsurl} className="btn btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}
