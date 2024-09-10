package ru.moscowairpollution.POST_CSV_Handler;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HandlerRepository extends JpaRepository<Handler,Long> {
}
