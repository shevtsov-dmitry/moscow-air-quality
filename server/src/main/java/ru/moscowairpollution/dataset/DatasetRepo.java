package ru.moscowairpollution.dataset;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DatasetRepo extends JpaRepository<Dataset,Long> {
}
