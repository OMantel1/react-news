import React from "react";
import {Link} from 'react-router-dom'

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }
  componentDidMount() {
    fetch(
      "http://newsapi.org/v2/top-headlines?country=fr&apiKey=156ffdbdcc3b49fe83f4e1e4d12c9c85"
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          articles: result.articles,
        });
      });
  }
  render() {
    let { param } = this.props.match.params;
    let sourceParams = param.split("_");
    let sourceDate = sourceParams[1];
    let source = sourceParams[0]
      .split("")
      .splice(1, sourceParams[0].length)
      .join("");
    return (
      <div className="container">
        {this.state.articles.map((x) => {
          if (x.source.name === source && x.publishedAt === sourceDate) {
            return (
              <div className="article">
                <img className="article__img" src={x.urlToImage} alt={x.title}/>
                <div className="article__text">
                  <p className="article__date">
                    le{" "}
                    {x.publishedAt
                      .split("")
                      .splice(0, 10)
                      .join("")
                      .split("-")
                      .reverse()
                      .join(".")}{" "}
                    à {x.publishedAt.split("").splice(11, 5)}
                  </p>
                  <h2 className="article__title">{x.title}</h2>
                  <p className="article__content">{x.content}</p>
                  <div className="article__links">
                    <a className="article__link" href={x.url} target="_blank" rel="noreferrer">
                      lire l'article original
                    </a>
                    <Link to="/" className="article__link">Revenir aux articles</Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Article;
