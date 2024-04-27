import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import RoomCard from "../room/RoomCard";
import RoomPagination from "../common/RoomPaginator";

const RoomSearchResult = ({ results, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultsPerPage; // 3-1 * 3 = 6
  const endIndex = startIndex + resultsPerPage; // 6+3 = 9
  const currentResults = results.slice(startIndex, endIndex); // slice(6,9) => [6,7,8]. lay tu start neu lay tu index tu 0

  return (
    <>
      {totalResults > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Result</h5>
          <Row>
            {currentResults.map((room) => 
              <RoomCard key={room.id} room={room} />
            )}
          </Row>
          <Row>
            {totalResults > resultsPerPage && (
              <RoomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            <Button variant="secondary" onClick={onClearSearch}>
              Clear Search
            </Button>
          </Row>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};
export default RoomSearchResult;
