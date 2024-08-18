import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Sparklines from 'react-sparklines';
import SparklinesLine from 'react-sparklines';

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
                        <TableCell align="right">วัน</TableCell>
                        {/* <TableCell align="right">Normal Storage (m³)</TableCell> */}
                        <TableCell align="right">น้ำในอ่าง (m³)</TableCell>
                        <TableCell align="right">น้ำในอ่าง (%)</TableCell>
                        <TableCell align="right">น้ำไหลลงอ่าง (m³/s)</TableCell>
                        <TableCell align="right">น้ำระบาย (m³/s)</TableCell>
                        <TableCell align="right">จังหวัด</TableCell>
                        {/* <TableCell align="right">Area Code</TableCell>
                        <TableCell align="right">Area Name</TableCell> */}
                        <TableCell align="right">แนวโนมน้ำในอ่าง</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => {
                        const isNewArea = item.area_code !== lastAreaCode;
                        lastAreaCode = item.area_code; // Update lastAreaCode to current
                        
                        return (
                            <>
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
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{item.dam_name_th}</TableCell>
                                    <TableCell align="right">{item.dam_date}</TableCell>
                                    {/* <TableCell align="right">{item.normal_storage}</TableCell> */}
                                    <TableCell align="right">{item.dam_storage}</TableCell>
                                    <TableCell align="right">{`${item.dam_storage_percent.toFixed(2)}%`}</TableCell>
                                    <TableCell align="right">{item.dam_inflow}</TableCell>
                                    <TableCell align="right">{item.dam_released}</TableCell>
                                    <TableCell align="right">{item.province_name_th}</TableCell>
                                    {/* <TableCell align="right">{item.area_code}</TableCell> */}
                                    {/* <TableCell align="right">{item.area_name_th}</TableCell> */}
                                    <TableCell align="right" style={{ padding: 0, width: '30%' }}>
                                        <Sparklines data={getHistoricalData(item.dam_name_th)} limit={14} width={60} height={15} area>
                                          <SparklinesLine color="blue" style={{ strokeWidth: "0.2"}} />
                                         
                                        </Sparklines>
                                    </TableCell>
                                </TableRow>
                            </>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
