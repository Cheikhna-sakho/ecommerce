import styled from "styled-components";
import Card from "../product/Card";
import Product from "../product/Product";


const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;

`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;

`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;

`;
const Option = styled.option``;

const ProductList = () => {
  return (
    <>
      <Title>Produit</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
       
        </Filter>
      </FilterContainer>
      <Card/>
        <Product />
      </>
  );
};

export default ProductList;