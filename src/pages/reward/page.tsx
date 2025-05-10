import React, { useState, useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";  // Assuming you're using MUI for Box
import { cn } from "../../utils/utils"
import api from "../../services/api";
type AlignType = 'right' | 'left' | 'center' | 'inherit' | 'justify';
import { Copy } from 'lucide-react';
import tokenServices from "../../services/token-services";
import { alertActions } from "../../store";
import { useDispatch } from "react-redux";


const columns = [
    {
        id: 'fromUserId',
        label: 'ID',
        minWidth: 70,
        align: "center" as AlignType,
    },
    {
        id: 'waterReward',
        label: 'Water Reward',
        minWidth: 70,
        align: "center" as AlignType,
    },
    {
        id: 'firstReward',
        label: 'First Reward',
        minWidth: 70,
        align: "center" as AlignType,
    }
];


const MyComponent = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        "0": [
            { "toUserId": 1, "fromUserId": 7, "level": 0, "fromUserName": "1234567891", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 8, "level": 0, "fromUserName": "1234567892", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 9, "level": 0, "fromUserName": "1234567893", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 10, "level": 0, "fromUserName": "1234567894", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 11, "level": 0, "fromUserName": "1234567895", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 12, "level": 0, "fromUserName": "1234567896", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 13, "level": 0, "fromUserName": "1234567897", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 14, "level": 0, "fromUserName": "1234567898", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 15, "level": 0, "fromUserName": "1234567899", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 16, "level": 0, "fromUserName": "1234567900", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 17, "level": 0, "fromUserName": "1234567901", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 18, "level": 0, "fromUserName": "1234567902", "waterReward": 0.0, "firstReward": 400.0 }
        ],
        "1": [
            { "toUserId": 1, "fromUserId": 19, "level": 1, "fromUserName": "1234567891", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 20, "level": 1, "fromUserName": "1234567892", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 21, "level": 1, "fromUserName": "1234567893", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 22, "level": 1, "fromUserName": "1234567894", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 23, "level": 1, "fromUserName": "1234567895", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 24, "level": 1, "fromUserName": "1234567896", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 25, "level": 1, "fromUserName": "1234567897", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 26, "level": 1, "fromUserName": "1234567898", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 27, "level": 1, "fromUserName": "1234567899", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 28, "level": 1, "fromUserName": "1234567900", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 29, "level": 1, "fromUserName": "1234567901", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 30, "level": 1, "fromUserName": "1234567902", "waterReward": 0.0, "firstReward": 400.0 }
        ],
        "2": [
            { "toUserId": 1, "fromUserId": 31, "level": 2, "fromUserName": "1234567891", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 32, "level": 2, "fromUserName": "1234567892", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 33, "level": 2, "fromUserName": "1234567893", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 34, "level": 2, "fromUserName": "1234567894", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 35, "level": 2, "fromUserName": "1234567895", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 36, "level": 2, "fromUserName": "1234567896", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 37, "level": 2, "fromUserName": "1234567897", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 38, "level": 2, "fromUserName": "1234567898", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 39, "level": 2, "fromUserName": "1234567899", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 40, "level": 2, "fromUserName": "1234567900", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 41, "level": 2, "fromUserName": "1234567901", "waterReward": 0.0, "firstReward": 400.0 },
            { "toUserId": 1, "fromUserId": 42, "level": 2, "fromUserName": "1234567902", "waterReward": 0.0, "firstReward": 400.0 }
        ]
    }
    );

    const [currentTab, setCurrentTab] = useState("0");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('https://play-247.in/games/gamma/lucky9/getRewardsEarned');
                const result = response.data;
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleClipboard = async () => {
        try {
            let str = `https://ag.play-247.in/register?agentCode=${tokenServices.getUserId()}`
            await navigator.clipboard.writeText(str);
            dispatch(
                alertActions.showAlert({
                    show: true,
                    message: "Copy Referal link",
                    // severity: response.severity,
                })
            );
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    }

    if (loading) {
        return (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-white">Loading...</div>
                </div>
        );
    }

    if (Object.keys(data).length == 0) {
        return (
            <div>
                 <div className="flex items-center justify-center mt-5">

                <Box
                    className={cn(
                        "rounded-lg flex items-center gap-3 text-sm justify-center py-2 cursor-pointer text-center px-4 font-[Inter,sans-serif] bg-[#2aa1f3] text-white"
                    )}
                    onClick={handleClipboard}
                >
                    Copy Link
                    <Copy size={15} />
                </Box>
                </div>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-white">No Data Available...</div>
                </div>
            </div>
            
        );
    }


    const levels = Object.keys(data);  // Get levels dynamically from the data object

    const filteredData = data[currentTab].filter(
        (row) =>
            row.fromUserId.toString().includes(searchQuery) ||
            row.waterReward.toString().includes(searchQuery) ||
            row.firstReward.toString().includes(searchQuery)
    );

  

    return (
        <div className="h-full mb-[100px]">
            <div className="flex items-center justify-center mt-5">

                <Box
                    className={cn(
                        "rounded-lg flex items-center gap-3 text-sm justify-center py-2 cursor-pointer text-center px-4 font-[Inter,sans-serif] bg-[#2aa1f3] text-white"
                    )}
                    onClick={handleClipboard}
                >
                    Copy Link
                    <Copy size={15} />
                </Box>
            </div>
            {/* Tab navigation */}
            <Box className="grid grid-cols-3 gap-3 mx-3 my-5">
                {levels.map((level) => (
                    <Box
                        key={level}
                        className={cn(
                            "rounded-lg flex items-center justify-center py-2 cursor-pointer text-center font-semibold font-[Inter,sans-serif] bg-[#2b3270] text-gray-400",
                            currentTab === level && "bg-[#2aa1f3] text-white"
                        )}
                        onClick={() => { setSearchQuery(""); setCurrentTab(level) }}
                    >
                        <h1 className="text-sm">Level {parseInt(level) + 1}</h1>
                    </Box>
                ))}
            </Box>

            {/* Search input */}
            <div className="mx-3 mb-5">
                <input
                    className="w-full h-8 outline-none border border-white border-opacity-40 rounded-lg p-0.5 px-2 text-white bg-[#2B3370]"
                    placeholder="Search..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Data Table */}
            <div className="mx-3">
                <TableContainer sx={{ maxHeight: 340 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead sx={{ backgroundColor: "#2B3370" }}>
                            <TableRow sx={{ backgroundColor: "#2B3370" }}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, backgroundColor: "#384991", color: "#ffffff" }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        style={{ backgroundColor: "#2B3370", color: "#ffffff", border: "none" }}
                                                        key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    style={{ color: "#fff" }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>


        </div>
    );
};

export default MyComponent;
