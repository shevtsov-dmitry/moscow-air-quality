package ru.moscowairpollution.dataset;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DatasetRepo extends JpaRepository<Dataset, Long> {
    List<Dataset> findDatasetsByDate(String date);
}
