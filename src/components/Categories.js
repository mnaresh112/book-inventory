import React from 'react';
import { Table } from 'reactstrap';

class Categories extends React.Component {

  render() {
    const { books, setFilter, editCategory, deleteCategory } = this.props;
    const categories = {};

    books.map((b, i) => {
      if(!categories[b['category']]) {
        categories[b['category']] = 1;
      } else {
        categories[b['category']] += 1;
      }
    });

    return (
      <Table responsive className="table-hover table-stripped my-3">
        <thead>
          <tr>
            <th>Category</th>
            <th className="text-center">Count</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(categories).map((category, i) => {
            return (
              <tr key={category}>
                <td className="cursor-pointer" onClick={(e) => setFilter(category)}>{category}</td>
                <td className="text-center">{categories[category]}</td>
                <td className="text-center">
                  <i className="far fa-edit mx-1 px-1 cursor-pointer" onClick={(e) => editCategory(category)}></i>
                  <i className="far fa-trash-alt mx-1 px-1 cursor-pointer" onClick={(e) => deleteCategory(category)}></i>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}

export default Categories;
