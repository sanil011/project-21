import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import PropTypes from "prop-types";

// Helper function to convert string numbers to actual numbers
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
    };
    return numberMap[value] || 0;
};

const HistoryTable = ({ bets }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                backgroundColor: "#342e3d",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#342e3d" }}>
                        <TableCell
                            align="center"
                            sx={{
                                color: "#fbdf9a",
                                fontWeight: "bold",
                                fontSize: "14px",
                                border: "none",
                                padding: "8px",
                            }}
                        >
                            Transaction ID
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{
                                color: "#fbdf9a",
                                fontWeight: "bold",
                                fontSize: "14px",
                                border: "none",
                                padding: "8px",
                            }}
                        >
                            Odd
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{
                                color: "#fbdf9a",
                                fontWeight: "bold",
                                fontSize: "14px",
                                border: "none",
                                padding: "8px",
                            }}
                        >
                            Amount
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{
                                color: "#fbdf9a",
                                fontWeight: "bold",
                                fontSize: "14px",
                                border: "none",
                                padding: "8px",
                            }}
                        >
                            Winner
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bets.map((bet) => (
                        <TableRow
                            key={bet.betId}
                            sx={{
                                backgroundColor: "#241d2a",
                                "&:last-child td, &:last-child th": { border: 0 },
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
                            >
                                {bet.betId}
                            </TableCell>
                            <TableCell align="center" sx={{ border: "none", padding: "8px" }}>
                                <Box
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: "50%",
                                        backgroundColor: "#8c6a36",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        color: "#fbdf9a",
                                    }}
                                >
                                    {getNumericValue(bet.odd)}
                                </Box>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    color: "#fbdf9a",
                                    fontSize: "12px",
                                    fontWeight: "medium",
                                    border: "none",
                                    padding: "4px",
                                }}
                            >
                                {bet.amount.toLocaleString()}
                            </TableCell>
                            <TableCell align="center" sx={{ border: "none", padding: "8px" }}>
                                <Box
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: "50%",
                                        backgroundColor: "#8c6a36",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        color: "#fbdf9a",
                                    }}
                                >
                                    {getNumericValue(bet.gameWinner)}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

HistoryTable.propTypes = {
    bets: PropTypes.array.isRequired,
};

export default HistoryTable;
