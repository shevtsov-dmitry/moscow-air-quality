package ru.moscowairpollution.dataset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DatasetRepo extends JpaRepository<Dataset, Long> {
    List<Dataset> findDatasetsByDate(String date);
}
