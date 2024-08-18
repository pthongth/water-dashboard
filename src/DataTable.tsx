import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface DamData {
    dam_name_th: string;
    dam_date: string;
    normal_storage: number;
    dam_storage: number;
    dam_storage_percent: number;
    dam_inflow: number;
    dam_released: number;
    province_name_th: string;
    area_code: number;
    area_name_th: string;
}

interface DataTableProps {
    data: DamData[];
    getHistoricalData: (damName: string) => number[];
}

const DataTable: React.FC<DataTableProps> = ({ data, getHistoricalData }) => {

    let lastAreaCode = -1;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ชื่อ</TableCell>
                        <TableCell align="center">วัน</TableCell>
                        <TableCell align="center">น้ำในอ่าง (m³)</TableCell>
                        <TableCell align="center">น้ำในอ่าง (%)</TableCell>
                        <TableCell align="center">น้ำไหลลงอ่าง (m³/s)</TableCell>
                        <TableCell align="center">น้ำระบาย (m³/s)</TableCell>
                        <TableCell align="center">จังหวัด</TableCell>
                        <TableCell align="center">แนวโนมน้ำในอ่าง</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => {
                        const isNewArea = item.area_code !== lastAreaCode;
                        lastAreaCode = item.area_code;
                        
                        return (
                            <React.Fragment key={index}>
                                {isNewArea && (
                                    <TableRow>
                                        <TableCell colSpan={11} style={{ padding: '16px', backgroundColor: '#f0f0f0' }}>
                                            <Typography variant="h6" style={{ color: '#1976d2' }}>
                                                {item.area_name_th}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{item.dam_name_th}</TableCell>
                                    <TableCell align="right">{item.dam_date}</TableCell>
                                    <TableCell align="right">{item.dam_storage}</TableCell>
                                    <TableCell align="right">{`${item.dam_storage_percent.toFixed(2)}%`}</TableCell>
                                    <TableCell align="right">{item.dam_inflow}</TableCell>
                                    <TableCell align="right">{item.dam_released}</TableCell>
                                    <TableCell align="right">{item.province_name_th}</TableCell>
                                    <TableCell align="right" style={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ width: '250px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={getHistoricalData(item.dam_name_th).slice(-14).map((value, i) => ({ value, index: i }))}>
                                                <Line type="monotone" dataKey="value" stroke="blue" dot={true} strokeWidth={1.5} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
