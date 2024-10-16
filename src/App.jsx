import './App.css';
import { useState, useEffect, useCallback } from "react";
import "./styles/variables.css";
import library from "./data/library.json";
import Header from "./components/header/Header";
import Filter from "./components/filter/Filter";
import List from "./components/list/List";
import * as chrono from "chrono-node";

function App() {
    const [booksList, setBooksList] = useState([...library]);
    const [sortedList, setSortedList] = useState([...library]);
    const [currentSortOption, setCurrentSortOption] = useState(null);
    const [currentSortDirection, setCurrentSortDirection] = useState("asc");
    const [tags, setTags] = useState(new Set([]));
    const [selectedTags, setSelectedTags] = useState(new Set([]));

    useEffect(() => {
        setTags(
            library.reduce((list, item) => {
                return list.union(new Set(item.tags));
            }, new Set([])),
        );
    }, []);

    const sortList = useCallback((options) => {
        // Фильтрация книг
        const filteredBooksList = booksList.filter((item) => {
            const hasRequiredProps = item.price !== undefined && item.date && item.author;
            if (!hasRequiredProps) {
                console.log(`У элемента "${item.title}" отсутствует обязательное свойство.`);
            }
            return hasRequiredProps;
        });

        // Сортировка
        let sorted = [];
        if (options.type === "author") sorted = sortByAuthor(options.direction, filteredBooksList);
        else if (options.type === "price") sorted = sortByPrice(options.direction, filteredBooksList);
        else if (options.type === "date") sorted = sortByDate(options.direction, filteredBooksList);
        else sorted = filteredBooksList;

        setSortedList(sorted);
    }, [booksList]);

    useEffect(() => {
        sortList({ type: currentSortOption, direction: currentSortDirection });
    }, [currentSortOption, currentSortDirection, sortList]);

    useEffect(() => {
        const updatedBooksList = selectedTags.size === 0
            ? [...library]
            : library.filter((item) => {
                return selectedTags.intersection(new Set(item.tags)).size > 0;
            });

        setBooksList(updatedBooksList);
    }, [selectedTags]);

    function changeSortDirection(type) {
        if (currentSortOption === type) {
            setCurrentSortDirection(currentSortDirection === "asc" ? "desc" : "asc");
        } else {
            setCurrentSortOption(type);
            setCurrentSortDirection("asc");
        }
    }

    function sortByAuthor(direction, list) {
        const surname = (name) => name.split(" ").slice(-1)[0];
        const invert = direction === "desc" ? -1 : 1;

        return [...list].sort((a, b) => {
            return (
                invert *
                surname(a.author).localeCompare(surname(b.author), "en", {
                    sensitivity: "base",
                })
            );
        });
    }

    function sortByPrice(direction, list) {
        return [...list].sort((a, b) => {
            return direction === "asc" ? a.price - b.price : b.price - a.price;
        });
    }

    function sortByDate(direction, list) {
        return [...list].sort((a, b) => {
            const dateA = chrono.parseDate(a.date);
            const dateB = chrono.parseDate(b.date);
            return direction === "asc" ? dateA - dateB : dateB - dateA;
        });
    }

    function handleTagSelection(tag) {
        const newSelectedTags = new Set(selectedTags);
        if (newSelectedTags.has(tag)) {
            newSelectedTags.delete(tag);
        } else {
            newSelectedTags.add(tag);
        }
        setSelectedTags(newSelectedTags);
    }

    function resetFilter() {
        setSelectedTags(new Set());
        setBooksList([...library]);
    }

    return (
        <>
            <Header />
            <Filter
                onSort={changeSortDirection}
                onTagClick={handleTagSelection}
                onResetFilter={resetFilter}
                sortOption={currentSortOption}
                sortOptionDirection={currentSortDirection}
                tags={tags}
                selectedTags={selectedTags}
            />
            <List items={sortedList} onTagClick={handleTagSelection} />
        </>
    );
}

export default App;
