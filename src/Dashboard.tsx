import { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { CssBaseline, Box } from '@mui/material';
import axiosInstance from './axiosInstance';

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

interface HistoricalData {
    [key: string]: number[];
}

const Dashboard = () => {
    const [damData, setDamData] = useState<DamData[]>([]);
    const [historicalData, setHistoricalData] = useState<HistoricalData>({});

    useEffect(() => {
      axiosInstance.get('/api/dam_data/latest')
            .then(response => {
                setDamData(response.data);
                preloadHistoricalData(response.data);
            })
            .catch(error => {
                console.error('Error fetching latest dam data:', error);
            });
    }, []);

    const preloadHistoricalData = (data: DamData[]) => {
        const fetchPromises = data.map(dam => {
            return axiosInstance.get(`/api/dam_data/historical?dam_name_th=${encodeURIComponent(dam.dam_name_th)}`)
                .then(response => ({
                    key: dam.dam_name_th,
                    data: response.data.map((item: { dam_storage: number }) => item.dam_storage)
                }));
        });

        Promise.all(fetchPromises).then(results => {
            const newData = results.reduce((acc, result) => ({
                ...acc,
                [result.key]: result.data
            }), {});
            setHistoricalData(newData);
        }).catch(error => {
            console.error('Error fetching historical data:', error);
        });
    };

    const getHistoricalData = (damName: string) => {
        return historicalData[damName] || [];
    };

    return (
        <>
          <CssBaseline />
          <Box display="flex" flexDirection="column" height="100vh">
            <DataTable data={damData} getHistoricalData={getHistoricalData} />
          </Box>
        </>
    );
};

export default Dashboard;
