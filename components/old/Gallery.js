import styles from '../../css/gallery.module.css'

import { useEffect, useState } from 'react';

import { createClient } from "@/utils/supabase/client";
import { useQuery, useQueryClient, useMutation  } from '@tanstack/react-query';
import Select from 'react-select'

import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';

import GalleryCard from '@/components/old/GalleryCard'

const supabase = createClient()

export default function Gallery() {
    const [currentpage, setCurentPage] = useState(1)
    const [currentTab, setCurrentTab] = useState("All")
    const [tabContent, setTabContent] = useState()
    const [paginationFocus, setPaginationFocus] = useState(false)
    const [pagination, setPagination] = useState()
    const [paginationOptions, setPaginationOptions] = useState([{value: 1, label: '1'}])
    const queryClient = useQueryClient()
    const userQueryGalleryCount = useQuery({queryKey: ['gallery'], queryFn: () => getGalleryCount()})

    useEffect(() => {
        calculatePagination()
    }, [userQueryGalleryCount?.data?.count])

    function calculateRangeStart(page){
        const nonZeroIndexValue = (page - 1) * 9
        return nonZeroIndexValue
    }

    function calculateRangeEnd(page){
        const nonZeroIndexValue = (page - 1) * 9
        if(nonZeroIndexValue !== 0){
            return nonZeroIndexValue - 1
        }else return nonZeroIndexValue
    }

    function updateGalleryBasedOnPagination(){

    }

    async function getGalleryCount(){
        const rangeStart = calculateRangeStart(currentpage)
        const rangeEnd = calculateRangeEnd(currentpage + 1)
        
        switch(currentTab){
            case "Designer":
                const designerQuery = await supabase
                    .from('accounts')  
                    .select('*', { count: 'exact' })
                    .eq('role', 'Designer')
                    .range(rangeStart, rangeEnd)
                return ((designerQuery?.count && designerQuery?.data) ?  {data:  designerQuery?.data, count: designerQuery?.count} : null)
            case "Developer":
                const developerQuery = await supabase
                    .from('accounts')  
                    .select('*', { count: 'exact' })
                    .eq('role', 'Developer')
                    .range(rangeStart, rangeEnd)
                return ((developerQuery?.count && developerQuery?.data) ?  {data:  developerQuery?.data, count: developerQuery?.count} : null)
            default:
                const allQuery = await supabase
                    .from('accounts')  
                    .select('*', { count: 'exact' })
                    .range(rangeStart, rangeEnd)
                return ((allQuery?.count && allQuery?.data) ?  {data:  allQuery?.data, count: allQuery?.count} : null)
        }
    }

    function calculatePagination(){
        const  maxCardPerPage = 9
        if(userQueryGalleryCount?.data?.count){
            const pages = Math.ceil((userQueryGalleryCount?.data?.count/maxCardPerPage))
            setPagination(pages)
            
        }
    }

    const countMutation = useMutation({
        mutationFn: () => getGalleryCount(),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['gallery']})
        }

    })

    function changeTab(tab){
        setCurrentTab(tab)
        setCurentPage(1)
        countMutation.mutate()
    }

    const optionsTab = [
        {
            value: "All", 
            label: 'All'
        },
        {
            value: "Featured", 
            label: 'Featured'
        },
        {
            value: "Developer", 
            label: 'Developer'
        },
        {
            value: "Designer", 
            label: 'Designer'
        },
        {
            value: "Popular", 
            label: 'Popular'
        }
    ]

    function usePagination(type){
        switch(type){
            case "start":
                setCurentPage(1)
                countMutation.mutate()
                break;
            case "before":
                setCurentPage(currentpage - 1)
                countMutation.mutate()
                break;
            case "after":
                setCurentPage(currentpage + 1)
                countMutation.mutate()
                break;
            case "end":
                setCurentPage(pagination)
                countMutation.mutate()
                break;
        }
    }

    useEffect(() => {
    }, [currentTab])
    return (
        <span className={styles.gallery}>
           <span className={styles.header}>
                <Select className={styles.selector} styles={{ control: (baseStyles, state) => ({...baseStyles, width: "100%"})}} options={optionsTab} defaultValue={optionsTab[0]} onChange={(e) => changeTab(e.value)}/>
                <span className={styles.labelContainer}>
                    <span  onClick={() => changeTab("All")} className={currentTab === "All" ? styles.labelSecleted : styles.label}>All</span>
                    <span  onClick={() => changeTab("Featured")} className={currentTab === "Featured" ? styles.labelSecleted : styles.label}>Featured</span>
                    <span  onClick={() => changeTab("Developer")} className={currentTab === "Developer" ? styles.labelSecleted : styles.label}>Developer</span>
                    <span  onClick={() => changeTab("Designer")} className={currentTab === "Designer" ? styles.labelSecleted : styles.label}>Designer</span>
                    <span  onClick={() => changeTab("Popular")} className={currentTab === "Popular" ? styles.labelSecleted : styles.label}>Popular</span>
                </span>
                <span className={styles.searchLabel}>
                    <SearchIcon fontSize='inherit'/>
                </span>
           </span>
           <span className={styles.content}>{userQueryGalleryCount?.data?.data.map((data, key) => (
                <GalleryCard content={data} key={key}/>
           ))}</span>
           <span className={styles.paginationContainer} onClick={() => setPaginationFocus(!paginationFocus)} onBlur={() => setPaginationFocus(false)}>
                {(!userQueryGalleryCount?.isLoading && pagination !== 1 && currentpage !== 1) ? <span className={styles.paginationContols} onClick={() => usePagination("start")}><KeyboardDoubleArrowLeftIcon fontSize='inherit'/> </span> : ""}
                {(!userQueryGalleryCount?.isLoading && pagination !== 1 && currentpage !== 1) ? <span className={styles.paginationContols} onClick={() => usePagination("before")}><ChevronLeftIcon fontSize='inherit'/> </span> : ""}
                <span className={styles.paginationBtn}>{currentpage}</span>
                <span className={styles.paginationInfo}>of</span>
                <span className={styles.paginationInfoCount}>{pagination ?? ""}</span>
                {(!userQueryGalleryCount?.isLoading && pagination !== 1 && currentpage !== pagination) ? <span className={styles.paginationContols}  onClick={() => usePagination("after")}><ChevronRightIcon fontSize='inherit'/> </span> : ""}
                {(!userQueryGalleryCount?.isLoading && pagination !== 1 && currentpage !== pagination) ? <span className={styles.paginationContols}  onClick={() => usePagination("end")}><KeyboardDoubleArrowRightIcon fontSize='inherit'/> </span> : ""}
           </span>
        </span>
    );

 }