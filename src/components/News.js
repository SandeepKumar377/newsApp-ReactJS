import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
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
    fetchMoreData = async () => {        
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe7f2b4455bb4940bb95d8b6e6db5ef3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <div className="container">
                <h2 className="text-center bg-success m-2 p-2">Top {this.capitalizeFirstLetter(this.props.category)} News </h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="row col-sm-12 my-3 d-flex">
                        {this.state.articles.map((element) => {
                            return <div className="col-sm-4" key={element.url}>
                                <NewsItems title={element.title} description={element.description ? element.description : ""}
                                    imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}                        
                    </div>
                </InfiniteScroll>                
            </div>
        )
    }
}

export default News
