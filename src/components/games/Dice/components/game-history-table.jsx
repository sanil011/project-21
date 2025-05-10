import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PropTypes from "prop-types";

const getNumericValue = (value) => {
    const numberMap = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        SIX: 6,
        SEVEN: 7,
        EIGHT: 8,
        NINE: 9,
        TEN: 10,
        ELEVEN: 11,
        TWELVE: 12,
    }
    return numberMap[value] || 0
}

const GameHistoryTable = ({ data }) => {
    return (
        <TableContainer component={Paper}
            sx={{
                backgroundColor: "#342e3d", // new background color
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#342e3d" }}>
                        <TableCell
                            align="center"
                            sx={{
                                color: "#fbdf9a", // text color
                                fontWeight: "bold",
                                fontSize: "14px",
                                border: "none",
                                padding: "8px",
                            }}>Sr.No</TableCell>

                        <TableCell
                            align="center"
                            sx={{
                                color: "#fbdf9a",
                                fontWeight: "bold",
                                fontSize: "14px",
                                border: "none",
                                padding: "8px",
                            }}
                        >Game ID</TableCell>

                        <TableCell
                            align="center"
                            sx={{
                                color: "#fbdf9a",
                                fontWeight: "bold",
                                fontSize: "14px",
                                border: "none",
                                padding: "8px",
                            }}>Winner</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                                backgroundColor: "#241d2a", // row background
                            }}
                        >
                            <TableCell
                                align="center"
                                sx={{
                                    color: "#fbdf9a",
                                    fontSize: "14px",
                                    fontWeight: "medium",
                                    border: "none",
                                    padding: "8px",
                                }}
                                component="th" scope="row">
                                {index + 1}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{
                                    color: "#fbdf9a",
                                    fontSize: "12px",
                                    fontWeight: "medium",
                                    border: "none",
                                    padding: "8px",
                                }}
                                component="th" scope="row">
                                {row.gameId}
                            </TableCell>

                            <TableCell align="center"
                                sx={{ border: "none", padding: "8px" }}
                            >
                                <Box
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: "50%",
                                        backgroundColor: "#8c6a36", // winner circle background
                                        color: "#fbdf9a", // winner text color
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto",
                                        fontWeight: "bold",
                                        fontSize: "13px",
                                    }}
                                >
                                    {getNumericValue(row.winner)}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

GameHistoryTable.propTypes = {
    data: PropTypes.array.isRequired,
};

export default GameHistoryTable;
