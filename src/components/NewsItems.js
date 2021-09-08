import { Component } from "react";
import { Link } from "react-router-dom";

export class NewsItems extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card m-3">
                    <span style={{ left:'50%',zIndex:'1'}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                                {source}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}
                            
                        </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By : <strong>{author ? author : "Unknown"}</strong>Date :<strong>{date ? new Date(date).toGMTString() : "Unknown"}</strong></small> </p>
                        <Link to={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Read more</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsItems