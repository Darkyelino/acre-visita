package com.acrevisita.femapi.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IService<T> {

    public Page<T> get(String termoBusca, Pageable page);
    public T get(Long id);
    public T save (T objeto);
    public void delete(Long id);

}