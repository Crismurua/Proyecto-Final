import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../Redux/actions/products";
import { useNavigate } from "react-router-dom";
import { useTable } from 'react-table';
import {IoIosArrowBack}from "react-icons/io"
import s from "../../styles/adminNav.module.css"
import { Link } from "react-router-dom";


const ProductsDash = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector(state => state.productsReducer.productsBackUp);



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
            <table {...getTableProps()} className={s.table}>
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
                <Link to={`/plants/details/${row.values.id}`}>DETAIL</Link>
              )
            },
            {
              id: 'Edit',
              Header: 'Edit',
              Cell: ({row}) => (
                <Link to={`/plants/edit/${row.values.id}`}>EDIT</Link>
              )
            }
          ])
        }

        const data = allProducts?.map(e => {
           return  {...e.data, id: e.id}; 
        });
       

    return(
        <div className={s.container}>
       <div className={s.button_container}>
            <button onClick={handleBack} className={s.back}>
              <IoIosArrowBack/>
            </button>

          </div>
            <Table columns={columns} data={data} />
        </div>
    )
};

export default ProductsDash;