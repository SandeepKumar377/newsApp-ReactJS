import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 9
    }
    static propTypes = {
        country: PropTypes.string,
        name: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `News Hunter - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe7f2b4455bb4940bb95d8b6e6db5ef3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
        this.updateNews();
    }
    prePageNews = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    nextPageNews = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();

    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center bg-success m-2 p-2">Top {this.capitalizeFirstLetter(this.props.category)} News </h2>
                {this.state.loading && <Spinner />}
                <div className="row col-sm-12 my-3 d-flex">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-sm-4" key={element.url}>
                            <NewsItems title={element.title} description={element.description ? element.description : ""}
                                imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-end">
                    <button disabled={this.state.page <= 1} className="btn btn-dark m-1" onClick={this.prePageNews}>&larr; Preview</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark m-1" onClick={this.nextPageNews}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
