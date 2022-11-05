import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../Redux/actions/products";
import { useNavigate } from "react-router-dom";
import { useTable } from 'react-table';
import { Link } from "react-router-dom";

const ProductsDash = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector(state => state.productsReducer.productsBackUp);


    React.useEffect(() => {
          dispatch(GetAllProducts());

    }, []);

    const handleBack = () => {
      navigate(-1);
    };

    const Table = ({ columns, data, id}) => {
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow
        } = useTable({columns, data}, tableHooks)

        return (
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        };
  
        const columns = React.useMemo(() => [
            {
                Header: 'Product',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name'
                    }
                ]
            },
            {
                Header: 'Info',
                columns: [
                            {
                                Header: 'Price',
                                accessor: 'price'
                            },
                            {
                                Header: 'Stock',
                                accessor: 'stock'
                            },
                            {
                              Header: 'id',
                              accessor: 'id'
                            }
                        ]
            }
        ], [])

        const tableHooks = hooks => {
          hooks.visibleColumns.push((columns) => [
            ...columns,
            {
              id: 'Detail',
              Header: 'Detail',
              Cell: ({row}) => (
                <Link to={`/plants/detail/${row.values.id}`}>DETAIL</Link>
              )
            }
          ])
        }

        const data = allProducts?.map(e => {
           return  e.data; 
        });
       
        const id = allProducts?.map(e => {
          return e.id;
        })
        console.log(id)
    return(
        <div>
            <button onClick={handleBack}>BACK</button>
            <Table columns={columns} data={data} id={id} />
        </div>
    )
};

export default ProductsDash;