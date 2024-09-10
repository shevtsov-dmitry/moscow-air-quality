package ru.airpollution_map_project_backend.POST_CSV_Handler;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HandlerRepository extends JpaRepository<Handler,Long> {
}
