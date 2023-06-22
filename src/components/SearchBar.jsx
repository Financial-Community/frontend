import { useState } from 'react';
import {Button, Input, InputGroup, InputLeftElement, InputRightAddon} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";

export const SearchBar = ({ users, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const filteredUsers = users.filter(user => {
      return user.data().username.toLowerCase().includes(searchTerm.toLowerCase());
    });
    onSearch(filteredUsers);
  };

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input
          type="text"
          placeholder="Search..."
          border="1px solid #949494"
          value={searchTerm}
          onChange={handleChange}
        />
        <InputRightAddon p={0} border="none">
          <Button
            size="sm"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border="1px solid #949494"
            onClick={handleSearch}
            type={"submit"}
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
