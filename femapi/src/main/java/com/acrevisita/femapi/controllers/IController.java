package com.acrevisita.femapi.controllers;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface IController<T> {

    public ResponseEntity<?> get(String termoBusca, boolean unpaged, Pageable page);
    public ResponseEntity<?> get(Long id);
    public ResponseEntity<?> insert(T objeto);
    public ResponseEntity<?> update(T objeto);
    public ResponseEntity<?> delete(Long id);
}
