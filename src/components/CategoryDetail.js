import React from 'react';
import { Table } from 'reactstrap';

class CategoryDetail extends React.Component {

  render() {
    const { books, category } = this.props;

    return (
      <div>
        <hr/>
        <h4>Category: {category}</h4>
        <Table responsive className="table-hover table-stripped my-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, i) => {
              return (
                <tr key={i}>
                  <td>{book.title}</td>
                  <td>${book.price}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CategoryDetail;
